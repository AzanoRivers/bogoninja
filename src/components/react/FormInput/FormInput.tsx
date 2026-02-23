/**
 * FormInput Component - Input de texto con estilo Bogoninja
 * 
 * @description
 * Input minimalista con línea inferior de color morado, texto en blanco.
 * Se ajusta al ancho del contenedor padre.
 * Usa la nueva sintaxis de refs de React 19 (sin forwardRef).
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
 *   ref={myRef}
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
    ref?: React.Ref<HTMLInputElement>;
}

export default function FormInput({ className = "", ref, ...props }: FormInputProps) {
    return (
        <input
            ref={ref}
            className={`w-full bg-transparent border-0 border-b border-ninja-light-pink/60 text-ninja-white font-lato sm:text-sm md:text-base font-light px-2 py-2 outline-none focus:border-ninja-light-pink transition-colors duration-300 placeholder:text-ninja-white/60 ${className}`}
            {...props}
        />
    );
}
