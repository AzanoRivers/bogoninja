/**
 * ContactForm Component - Formulario de contacto para Bogoninja
 * 
 * @description
 * Formulario completo con validaciones de longitud y campos requeridos.
 * Solo maquetado, sin estados ni efectos por ahora.
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

import { useId } from 'react';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormTextArea from '../FormTextArea/FormTextArea';
import FormRadioGroup from '../FormRadioGroup/FormRadioGroup';
import FormButton from '../FormButton/FormButton';

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
}

interface ContactFormProps {
    texts: ContactFormTexts;
    className?: string;
}

export default function ContactForm({ texts, className = "" }: ContactFormProps) {
    // Generar IDs únicos para esta instancia del formulario
    const nameId = useId();
    const improveId = useId();
    const experienceId = useId();
    const emailId = useId();
    
    const locationOptions = [
        { value: "modelia", label: texts.locationOption1 },
        { value: "parque-nacional", label: texts.locationOption2 },
        { value: "mosquera", label: texts.locationOption3 }
    ];

    return (
        <form className={`w-full flex flex-col gap-4 ${className}`}>
            {/* Nombre/Apodo */}
            <div className="flex flex-col gap-2">
                <FormLabel htmlFor={nameId}>{texts.nameLabel}</FormLabel>
                <FormInput
                    id={nameId}
                    name="name"
                    type="text"
                    placeholder={texts.namePlaceholder}
                    maxLength={60}
                    required
                />
            </div>

            {/* ¿Qué quieres mejorar? */}
            <div className="flex flex-col gap-2">
                <FormLabel htmlFor={improveId}>{texts.improveLabel}</FormLabel>
                <FormTextArea
                    id={improveId}
                    name="improve"
                    placeholder={texts.improvePlaceholder}
                    maxLength={100}
                    rows={2}
                    required
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
                />
            </div>

            {/* Qué lugar te queda más cómodo */}
            <div className="flex flex-col gap-2">
                <span className="inline-block w-fit px-3 py-1.5 bg-ninja-dark-pink/15 border border-ninja-dark-pink/40 rounded text-ninja-light-pink font-lato text-sm md:text-base font-light">
                    {texts.locationLabel}
                </span>
                <FormRadioGroup
                    name="location"
                    options={locationOptions}
                />
            </div>

            {/* Correo */}
            <div className="flex flex-col gap-2">
                <FormLabel htmlFor={emailId}>{texts.emailLabel}</FormLabel>
                <FormInput
                    id={emailId}
                    name="email"
                    type="email"
                    placeholder={texts.emailPlaceholder}
                    maxLength={80}
                    required
                />
            </div>

            {/* Botón de envío */}
            <FormButton type="submit" className="w-full mt-2">
                {texts.submitButton}
            </FormButton>
        </form>
    );
}
