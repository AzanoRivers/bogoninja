/**
 * ContactForm Component - Formulario de contacto para Bogoninja
 * 
 * @description
 * Formulario moderno usando useActionState de React 19.
 * Validaciones con react-hot-toast y progressive enhancement.
 * Se ajusta al contenedor padre para funcionar tanto en mobile como desktop.
 * 
 * @example
 * ```tsx
 * // En mobile
 * <div className="w-full px-4">
 *   <ContactForm />
 * </div>
 * 
 * // En desktop
 * <div className="w-1/2 mx-auto">
 *   <ContactForm />
 * </div>
 * ```
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { useId, useActionState, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormTextArea from '../FormTextArea/FormTextArea';
import FormRadioGroup from '../FormRadioGroup/FormRadioGroup';
import FormButton from '../FormButton/FormButton';
import SumValidate from '../SumValidate/SumValidate';

interface ContactFormTexts {
    nameLabel: string;
    namePlaceholder: string;
    improveLabel: string;
    improvePlaceholder: string;
    experienceLabel: string;
    experiencePlaceholder: string;
    locationLabel: string;
    locationOption1: string;
    locationOption2: string;
    locationOption3: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitButton: string;
    errorNameRequired: string;
    errorImproveRequired: string;
    errorEmailRequired: string;
    errorEmailInvalid: string;
    errorLocationRequired: string;
    successMessage: string;
    captchaLabel: string;
    errorCooldown: string;
    cooldownInfo: string;
	info_2: string;
}

interface ContactFormProps {
    texts: ContactFormTexts;
    className?: string;
}

interface SubmitFormContext {
    texts: ContactFormTexts;
}

interface FormState {
    success?: boolean;
    error?: string;
    fieldErrors?: {
        name?: string;
        improve?: string;
        email?: string;
        location?: string;
    };
    values?: {
        name: string;
        improve: string;
        experience: string;
        email: string;
        location: string;
    };
}

// Constantes para el cooldown en cliente
const COOLDOWN_FIRST_SUBMIT_KEY = 'bogoninja-form-first-submit';
const COOLDOWN_COUNT_KEY = 'bogoninja-form-count';
const COOLDOWN_MINUTES = 15;
const MAX_SUBMISSIONS = 2;

// Factory function para crear submitForm con acceso a los textos
function createSubmitForm(texts: ContactFormTexts) {
    return async function submitForm(prevState: FormState | null, formData: FormData): Promise<FormState> {
        // Verificar cooldown y contador en cliente (validación rápida)
        if (typeof window !== 'undefined') {
            const firstSubmitStr = localStorage.getItem(COOLDOWN_FIRST_SUBMIT_KEY);
            const countStr = localStorage.getItem(COOLDOWN_COUNT_KEY);
            const now = Date.now();
            
            if (firstSubmitStr) {
                const firstSubmitTime = parseInt(firstSubmitStr, 10);
                const elapsedMinutes = (now - firstSubmitTime) / (1000 * 60);
                
                // Si han pasado 15+ minutos, resetear contador
                if (elapsedMinutes >= COOLDOWN_MINUTES) {
                    localStorage.removeItem(COOLDOWN_FIRST_SUBMIT_KEY);
                    localStorage.removeItem(COOLDOWN_COUNT_KEY);
                } else {
                    // Aún no han pasado 15 minutos
                    const currentCount = parseInt(countStr || '0', 10);
                    
                    // Si ya se enviaron 2 veces, bloquear en cliente
                    if (currentCount >= MAX_SUBMISSIONS) {
                        const remainingMinutes = Math.ceil(COOLDOWN_MINUTES - elapsedMinutes);
                        return { 
                            error: texts.errorCooldown.replace('{minutes}', remainingMinutes.toString())
                        };
                    }
                }
            }
        }

        const name = formData.get('name') as string;
        const improve = formData.get('improve') as string;
        const experience = formData.get('experience') as string;
        const email = formData.get('email') as string;
        const location = formData.get('location') as string;

        // Guardar los valores para repoblar el formulario en caso de error
        const values = { name, improve, experience, email, location };

        // Validar campos requeridos
        const fieldErrors: FormState['fieldErrors'] = {};

        if (!name || name.trim() === '') {
            fieldErrors.name = texts.errorNameRequired;
        }

        if (!improve || improve.trim() === '') {
            fieldErrors.improve = texts.errorImproveRequired;
        }

        if (!email || email.trim() === '') {
            fieldErrors.email = texts.errorEmailRequired;
        } else {
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                fieldErrors.email = texts.errorEmailInvalid;
            }
        }

        if (!location) {
            fieldErrors.location = texts.errorLocationRequired;
        }

        // Si hay errores, retornarlos con los valores para repoblar el formulario
        if (Object.keys(fieldErrors).length > 0) {
            return { fieldErrors, values };
        }

        // Enviar datos al backend
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    improve,
                    experience,
                    email,
                    location
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Error del servidor (cooldown, validación, etc.)
                return { 
                    error: data.error || 'Error al enviar el formulario',
                    values 
                };
            }

            // Éxito - actualizar contador en localStorage
            if (typeof window !== 'undefined') {
                const firstSubmitStr = localStorage.getItem(COOLDOWN_FIRST_SUBMIT_KEY);
                const countStr = localStorage.getItem(COOLDOWN_COUNT_KEY);
                
                if (!firstSubmitStr) {
                    // Primer envío: guardar timestamp y establecer count = 1
                    localStorage.setItem(COOLDOWN_FIRST_SUBMIT_KEY, Date.now().toString());
                    localStorage.setItem(COOLDOWN_COUNT_KEY, '1');
                } else {
                    // Ya existe un primer envío: incrementar contador
                    const currentCount = parseInt(countStr || '0', 10);
                    localStorage.setItem(COOLDOWN_COUNT_KEY, (currentCount + 1).toString());
                }
            }

            return { success: true };

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            return { 
                error: 'Error de conexión. Por favor verifica tu internet e intenta nuevamente.',
                values 
            };
        }
    };
}

export default function ContactForm({ texts, className = "" }: ContactFormProps) {
    // Generar IDs únicos para esta instancia del formulario
    const nameId = useId();
    const improveId = useId();
    const experienceId = useId();
    const emailId = useId();
    
    // Refs para hacer focus en campos con error
    const nameRef = useRef<HTMLInputElement>(null);
    const improveRef = useRef<HTMLTextAreaElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    
    const locationOptions = [
        { value: "modelia", label: texts.locationOption1 },
        { value: "parque-nacional", label: texts.locationOption2 },
        { value: "mosquera", label: texts.locationOption3 }
    ];

    // Estado para validación de CAPTCHA
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [captchaResetKey, setCaptchaResetKey] = useState(0);

    // Usar useActionState de React 19
    const submitForm = createSubmitForm(texts);
    const [state, formAction, isPending] = useActionState<FormState | null, FormData>(submitForm, null);

    // Mostrar toasts basados en el estado y hacer focus en el campo con error
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(texts.successMessage, { duration: 10000 });
            // Limpiar el formulario después de envío exitoso
            formRef.current?.reset();
            // Resetear CAPTCHA (genera nuevos números)
            setCaptchaResetKey(prev => prev + 1);
        } else if (state.fieldErrors) {
            // Hacer focus en el primer campo con error
            if (state.fieldErrors.name) {
                toast.error(state.fieldErrors.name);
                nameRef.current?.focus();
            } else if (state.fieldErrors.improve) {
                toast.error(state.fieldErrors.improve);
                improveRef.current?.focus();
            } else if (state.fieldErrors.email) {
                toast.error(state.fieldErrors.email);
                emailRef.current?.focus();
            } else if (state.fieldErrors.location) {
                toast.error(state.fieldErrors.location);
            }
        } else if (state.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction} noValidate className={`w-full flex flex-col gap-4 ${className}`}>
            {/* Nombre/Apodo */}
            <div className="flex flex-col gap-2">
                <FormLabel htmlFor={nameId}>{texts.nameLabel}</FormLabel>
                <FormInput
                    ref={nameRef}
                    id={nameId}
                    name="name"
                    type="text"
                    placeholder={texts.namePlaceholder}
                    maxLength={60}
                    defaultValue={state?.values?.name || ''}
                />
            </div>

            {/* ¿Qué quieres mejorar? */}
            <div className="flex flex-col gap-2">
                <FormLabel htmlFor={improveId}>{texts.improveLabel}</FormLabel>
                <FormTextArea
                    ref={improveRef}
                    id={improveId}
                    name="improve"
                    placeholder={texts.improvePlaceholder}
                    maxLength={100}
                    rows={2}
                    defaultValue={state?.values?.improve || ''}
                />
            </div>

            {/* ¿Alguna experiencia que quieras compartir? */}
            <div className="flex flex-col gap-2">
                <FormLabel htmlFor={experienceId}>{texts.experienceLabel}</FormLabel>
                <FormTextArea
                    id={experienceId}
                    name="experience"
                    placeholder={texts.experiencePlaceholder}
                    maxLength={500}
                    rows={4}
                    defaultValue={state?.values?.experience || ''}
                />
            </div>

            {/* Qué lugar te queda más cómodo */}
            <div className="flex flex-col gap-2">
                <span className="inline-block w-fit px-3 py-1.5 bg-ninja-dark-pink/15 border border-ninja-dark-pink/40 rounded text-ninja-light-pink font-lato sm:text-sm md:text-base font-light">
                    {texts.locationLabel}
                </span>
                <FormRadioGroup
                    name="location"
                    options={locationOptions}
                    defaultValue={state?.values?.location}
                />
            </div>

            {/* Correo */}
            <div className="flex flex-col gap-2">
                <FormLabel htmlFor={emailId}>{texts.emailLabel}</FormLabel>
                <FormInput
                    ref={emailRef}
                    id={emailId}
                    name="email"
                    defaultValue={state?.values?.email || ''}
                    type="email"
                    placeholder={texts.emailPlaceholder}
                    maxLength={80}
                />
            </div>

            {/* Validación CAPTCHA */}
            <SumValidate 
                key={captchaResetKey}
                onValidChange={setIsCaptchaValid}
                label={texts.captchaLabel}
            />

            {/* Mensaje informativo de cooldown */}
            <div className="w-full py-2">
                <p className="text-ninja-light-pink/80 font-lato sm:text-xs md:text-sm lg:text-base xl:text-lg font-light text-left">
                    {texts.cooldownInfo}
                </p>
                <p className="mt-4 text-ninja-light-pink/80 font-lato sm:text-xs md:text-sm lg:text-base xl:text-lg font-light text-left">
                    {texts.info_2}
                </p>
            </div>

            {/* Botón de envío */}
            <FormButton type="submit" className="w-full mt-2" disabled={!isCaptchaValid || isPending}>
                {isPending ? 'Enviando...' : texts.submitButton}
            </FormButton>
        </form>
    );
}
