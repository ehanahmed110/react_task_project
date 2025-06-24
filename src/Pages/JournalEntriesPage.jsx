import React from 'react'; 
import { Menubar } from 'primereact/menubar';
//import { useRouter } from 'next/router';
export function JournalEntriesPage() {
    // const router = useRouter();
    const items = [
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Styled',
                    url: '/theming'
                },
                {
                    label: 'Unstyled',
                    url: '/unstyled'
                }
            ]
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            // command: () => {
            //     router.push('/installation');
            // }
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'React.js',
                    url: 'https://react.dev/'
                },
                {
                    label: 'Vite.js',
                    url: 'https://vitejs.dev/'
                }
            ]
        }
    ];

    return (
        <>
            <h1>Journel Entries page</h1>
               <div className="card">
            <Menubar model={items} />
        </div>
        </>
    )
}
