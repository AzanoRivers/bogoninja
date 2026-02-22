/**
 * FormTextArea Component - Área de texto con estilo Bogoninja
 * 
 * @description
 * TextArea minimalista con borde de color morado, texto en blanco.
 * Se ajusta al ancho y alto del contenedor padre.
 * 
 * @example
 * ```tsx
 * <FormTextArea 
 *   id="experience" 
 *   name="experience" 
 *   placeholder="Comparte tu experiencia"
 *   maxLength={500}
 *   rows={4}
 * />
 * <FormTextArea 
 *   id="improve" 
 *   name="improve" 
 *   className="mt-2"
 *   rows={3}
 * />
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export default function FormTextArea({ className = "", rows = 3, ...props }: FormTextAreaProps) {
    return (
        <textarea
            rows={rows}
            className={`w-full bg-transparent border border-ninja-light-pink/60 rounded text-ninja-white font-lato text-sm md:text-base font-light px-3 py-2 outline-none focus:border-ninja-light-pink transition-colors duration-300 placeholder:text-ninja-white/40 resize-none ${className}`}
            {...props}
        />
    );
}
