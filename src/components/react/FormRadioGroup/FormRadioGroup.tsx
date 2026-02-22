/**
 * FormRadioGroup Component - Grupo de radio buttons con estilo píldoras Bogoninja
 * 
 * @description
 * Radio buttons estilizados como píldoras minimalistas con fondo morado leve.
 * Se ajustan al contenedor y se apilan hacia abajo si no caben.
 * 
 * @example
 * ```tsx
 * <FormRadioGroup
 *   name="location"
 *   options={[
 *     { value: "modelia", label: "Modelia" },
 *     { value: "parque-nacional", label: "Parque Nacional" },
 *     { value: "mosquera", label: "Mosquera" }
 *   ]}
 * />
 * 
 * <FormRadioGroup
 *   name="preference"
 *   options={options}
 *   className="mt-4"
 * />
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

interface RadioOption {
    value: string;
    label: string;
}

interface FormRadioGroupProps {
    name: string;
    options: RadioOption[];
    className?: string;
}

export default function FormRadioGroup({ name, options, className = "" }: FormRadioGroupProps) {
    return (
        <div className={`flex flex-wrap gap-2 items-start justify-start ${className}`}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className="inline-flex items-center gap-2 px-3 py-1.5 border border-ninja-light-pink/40 rounded cursor-pointer transition-all duration-300 hover:border-ninja-light-pink/60 has-checked:border-ninja-light-pink"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        className="appearance-none w-3 h-3 border border-ninja-light-pink/60 rounded-full checked:bg-ninja-light-pink checked:border-ninja-light-pink transition-all duration-200 cursor-pointer"
                    />
                    <span className="text-ninja-light-pink font-lato text-sm md:text-base font-light select-none">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
