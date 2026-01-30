import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

Deno.serve(async (req: Request) => {
    try {
        const payload = await req.json();
        const { record, old_record, type } = payload;

        // Detect changes in reservation
        const newReservedBy = record?.reserved_by;
        const oldReservedBy = old_record?.reserved_by;

        if (newReservedBy === oldReservedBy) {
            return new Response(JSON.stringify({ message: "No changes in reservation" }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        let subject = "";
        let html = "";

        if (newReservedBy && !oldReservedBy) {
            // NEW RESERVATION
            subject = `🎁 Novo Presente Reservado: ${record.name}`;
            html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #141414; text-align: center;">🎉 Ótimas notícias!</h2>
          <p>Alguém acabou de reservar um presente da sua lista.</p>
          <div style="background-color: #fcfcfc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Produto:</strong> ${record.name}</p>
            <p><strong>Quem reservou:</strong> ${newReservedBy}</p>
            <p><strong>Mensagem:</strong> ${record.reservation_message || "<i>Sem mensagem</i>"}</p>
          </div>
          <p style="text-align: center; color: #666; font-size: 12px;">Parabéns pelo novo lar!</p>
        </div>
      `;
        } else if (!newReservedBy && oldReservedBy) {
            // CANCELLATION
            subject = `⚠️ Reserva Cancelada: ${record.name}`;
            html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #d32f2f; text-align: center;">Aviso de Cancelamento</h2>
          <p>Uma reserva foi cancelada na sua lista de presentes.</p>
          <div style="background-color: #fff5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Produto:</strong> ${record.name}</p>
            <p><strong>Email:</strong> ${oldReservedBy}</p>
          </div>
          <p>O item voltou a ficar disponível para outros convidados.</p>
        </div>
      `;
        } else {
            return new Response(JSON.stringify({ message: "Irrelevant change" }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        const { data, error } = await resend.emails.send({
            from: "Chá de Casa Nova <notifications@resend.dev>", // Or verified domain
            to: ["glaydsonfsousa@gmail.com"],
            subject: subject,
            html: html,
        });

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});
