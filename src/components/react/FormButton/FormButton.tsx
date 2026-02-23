/**
 * FormButton Component - Botón para formularios con estilo Bogoninja
 * 
 * @description
 * Botón minimalista con borde morado y efecto hover sutil.
 * Se ajusta al contenedor padre o puede tener ancho fijo según las clases adicionales.
 * 
 * @example
 * ```tsx
 * <FormButton type="submit">Enviar</FormButton>
 * <FormButton type="button" className="w-full mt-4">Cancelar</FormButton>
 * <FormButton disabled>Enviando...</FormButton>
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export default function FormButton({ children, className = "", ...props }: FormButtonProps) {
    return (
        <button
            className={`sm:px-8 md:px-10 lg:px-12 sm:py-3 md:py-4 lg:py-5 bg-ninja-dark-pink/30 border border-ninja-light-pink/60 rounded text-ninja-light-pink font-lato sm:text-base md:text-lg lg:text-xl font-light transition-all duration-300 hover:border-ninja-light-pink hover:bg-ninja-dark-pink/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-ninja-dark-pink/30 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
