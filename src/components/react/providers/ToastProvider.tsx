/**
 * ToastProvider Component - Provider global para React Hot Toast
 * 
 * @description
 * Componente que renderiza el Toaster con estilos personalizados
 * compatibles con el diseño de Bogoninja (Badge style).
 * Se coloca en el layout principal para que funcione en todas las páginas.
 * Usa Tailwind CSS para responsive breakpoints.
 * 
 * @author AzanoRivers
 * @ai Claude Sonnet 4.5 (GitHub Copilot)
 */

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
    return (
        <Toaster 
            position="top-center"
            containerStyle={{
                zIndex: 9999,
            }}
            toastOptions={{
                duration: 2000,
                className: 'font-lato font-light',
                style: {
                    background: 'rgb(from var(--color-ninja-dark-pink) r g b / 0.3)',
                    backdropFilter: 'blur(10px)',
                    color: 'var(--color-ninja-white)',
                    border: '1px dashed var(--color-ninja-dark-pink)',
                    borderRadius: '0px',
                    boxShadow: '0 0 20px rgba(207, 85, 232, 0.3)',
                    minWidth: '240px',
                    maxWidth: '85vw',
                    padding: '14px 16px',
                },
                error: {
                    className: 'sm:text-base md:text-lg lg:text-xl xl:text-2xl',
                    style: {
                        background: 'rgb(from var(--color-ninja-dark-pink) r g b / 0.4)',
                        border: '1px dashed var(--color-ninja-dark-pink)',
                    },
                    iconTheme: {
                        primary: 'var(--color-ninja-dark-pink)',
                        secondary: 'var(--color-ninja-white)',
                    },
                },
                success: {
                    className: 'sm:text-base md:text-lg lg:text-xl xl:text-2xl',
                    style: {
                        background: 'rgb(from var(--color-ninja-light-pink) r g b / 0.3)',
                        border: '1px dashed var(--color-ninja-light-pink)',
                    },
                    iconTheme: {
                        primary: 'var(--color-ninja-light-pink)',
                        secondary: 'var(--color-ninja-white)',
                    },
                },
            }}
        />
    );
}
