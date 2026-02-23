/**
 * SumValidate Component - CAPTCHA de suma con canvas anti-bot
 * 
 * @description
 * Genera una suma aleatoria de dos números (0-10) dibujados en canvas
 * para evitar lectura automática por bots. Valida la respuesta del usuario
 * y notifica al componente padre del estado de validación.
 * 
 * @example
 * ```tsx
 * <SumValidate 
 *   onValidChange={(isValid) => setCanSubmit(isValid)}
 *   label="Resuelve la suma para continuar"
 * />
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { useState, useEffect, useRef, useId } from 'react';
import FormInput from '../FormInput/FormInput';

interface SumValidateProps {
    onValidChange: (isValid: boolean) => void;
    label?: string;
    className?: string;
}

export default function SumValidate({ onValidChange, label, className = "" }: SumValidateProps) {
    const inputId = useId();
    const canvas1Ref = useRef<HTMLCanvasElement>(null);
    const canvas2Ref = useRef<HTMLCanvasElement>(null);
    
    // Generar números aleatorios una sola vez al montar
    const [num1] = useState(() => Math.floor(Math.random() * 11));
    const [num2] = useState(() => Math.floor(Math.random() * 11));
    const [userAnswer, setUserAnswer] = useState('');
    
    const correctAnswer = num1 + num2;

    // Dibujar número en canvas con efectos anti-bot
    const drawNumber = (canvas: HTMLCanvasElement, number: number) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Configurar estilo
        ctx.fillStyle = '#E9B4FF'; // ninja-light-pink
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Agregar ligera rotación aleatoria (-10 a 10 grados)
        const rotation = (Math.random() - 0.5) * 0.3;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);

        // Dibujar el número
        ctx.fillText(number.toString(), 0, 0);

        // Agregar ruido sutil (puntos aleatorios)
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.fillStyle = `rgba(233, 180, 255, ${Math.random() * 0.3})`;
            ctx.fillRect(x, y, 1, 1);
        }

        ctx.restore();
    };

    // Dibujar números en los canvas al montar
    useEffect(() => {
        if (canvas1Ref.current) {
            drawNumber(canvas1Ref.current, num1);
        }
        if (canvas2Ref.current) {
            drawNumber(canvas2Ref.current, num2);
        }
    }, [num1, num2]);

    // Validar respuesta
    useEffect(() => {
        const answer = parseInt(userAnswer, 10);
        const isValid = !isNaN(answer) && answer === correctAnswer;
        onValidChange(isValid);
    }, [userAnswer, correctAnswer, onValidChange]);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label 
                    htmlFor={inputId}
                    className="inline-block w-fit px-3 py-1.5 bg-ninja-dark-pink/15 border border-ninja-dark-pink/40 rounded text-ninja-light-pink font-lato sm:text-sm md:text-base font-light"
                >
                    {label}
                </label>
            )}
            <div className="flex items-center gap-3">
                {/* Canvas número 1 */}
                <canvas
                    ref={canvas1Ref}
                    width={40}
                    height={40}
                    className="bg-ninja-dark-blue/30 border border-ninja-light-pink/40 rounded"
                    aria-label={`Primer número de la suma`}
                />
                
                {/* Símbolo + */}
                <span className="text-ninja-light-pink font-lato text-xl font-light select-none">
                    +
                </span>
                
                {/* Canvas número 2 */}
                <canvas
                    ref={canvas2Ref}
                    width={40}
                    height={40}
                    className="bg-ninja-dark-blue/30 border border-ninja-light-pink/40 rounded"
                    aria-label={`Segundo número de la suma`}
                />
                
                {/* Símbolo = */}
                <span className="text-ninja-light-pink font-lato text-xl font-light select-none">
                    =
                </span>
                
                {/* Input respuesta */}
                <FormInput
                    id={inputId}
                    type="number"
                    name="sum-validate"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="??"
                    className="max-w-20 text-center text-lg placeholder:text-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                    min={0}
                    max={20}
                    required
                    aria-label="Resultado de la suma"
                />
            </div>
        </div>
    );
}
