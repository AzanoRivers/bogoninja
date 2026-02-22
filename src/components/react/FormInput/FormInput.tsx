/**
 * FormInput Component - Input de texto con estilo Bogoninja
 * 
 * @description
 * Input minimalista con línea inferior de color morado, texto en blanco.
 * Se ajusta al ancho del contenedor padre.
 * 
 * @example
 * ```tsx
 * <FormInput 
 *   id="name" 
 *   name="name" 
 *   placeholder="Escribe tu nombre"
 *   maxLength={60}
 * />
 * <FormInput 
 *   id="email" 
 *   type="email" 
 *   name="email" 
 *   className="mt-2"
 * />
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function FormInput({ className = "", ...props }: FormInputProps) {
    return (
        <input
            className={`w-full bg-transparent border-0 border-b border-ninja-light-pink/60 text-ninja-white font-lato text-sm md:text-base font-light px-2 py-2 outline-none focus:border-ninja-light-pink transition-colors duration-300 placeholder:text-ninja-white/40 ${className}`}
            {...props}
        />
    );
}
