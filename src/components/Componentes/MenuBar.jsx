
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { PanelMenu } from 'primereact/panelmenu';
import { Badge } from 'primereact/badge';
import { Image } from 'primereact/image';
import Link from 'next/link';

export default function MenubarTerminado() {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    )
    const itemRenderer2 = (item) => (
        <Link href={'/'} className='especial'>
            <Image width='150' height='50' src='/icons/img/report.png'></Image>
        </Link>
    )

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Home2',
            icon: 'pi pi-home',
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S',
                    template: itemRenderer
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B',
                    template: itemRenderer
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U',
                    template: itemRenderer
                },
                {
                    separator: true
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            badge: 2,
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            badge: 3,
                            template: itemRenderer
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        }
    ]

    const middleIndex = Math.ceil(items.length / 2)

    const especialItem = {
        label: 'Especial',
        icon: 'pi pi-home',
        template: itemRenderer2
    }

    items.splice(middleIndex, 0, especialItem);

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="logoEspecial">
            <Link href={'/'} >
                <Image width='150' height='50' src='/icons/img/report.png'></Image>
            </Link>
        </div>
    )
    const [p, setP] = useState("")
    const hola = () => {
        if (p === "") {
            setP("p-menubar-mobile-active")
        } else {
            setP("")
        }

    }
    return (<React.Fragment>
        <div className="card especialmenu">
            {/* <div className={'p-menubar p-component ' + p}>
                <div className='p-menubar-start'>
                    {start}
                </div>
                <a href="#" onClick={hola} class="p-menubar-button" >
                    <span className="p-menuitem-icon pi pi-bars" style={{ fontSize: "1.5rem" }}></span>
                </a>
                <ul class="p-menubar-root-list centro-total w-full"
                    style={{ zIndex: p === "" ? 0 : 2003 }}>
                    {items && items.map((me, index) => (
                        <React.Fragment key={index}>
                            {index === Math.floor(items.length / 2) && (
                                <li className="p-menuitem especial" key="LiEspecial">
                                    {end}
                                </li>
                            )}
                            <li className="p-menuitem" key={me.label}>
                                <a href="#" className="p-menuitem-link">
                                    <span className={"p-menuitem-icon " + me.icon}></span>
                                    <span className={me.badge ? "p-menuitem-text mx-2" : "p-menuitem-text"}>{me.label}</span>
                                    {me.badge && <span class="ml-auto p-badge p-component p-badge-no-gutter gap-2" data-pc-name="badge" data-pc-section="root">3</span>}
                                    {me.items && <ul className='p-submenu-list'>
                                        {me.items && me.items.map((sm, index2) => (
                                            <li class="p-menuitem" >
                                                <a class="flex align-items-center p-menuitem-link">
                                                    <span class={sm.icon}>
                                                    </span>
                                                    <span class="mx-2">
                                                        {sm.label}
                                                    </span>
                                                    <span class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                                                        {sm.shortcut} </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>}
                                </a>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
                <div className='p-menubar-end logoEspecial'>
                    {end}
                </div>
            </div> */}
            <Menubar model={items} start={start} end={end} />
        </div>
        {/* <PanelMenu model={items} className="w-full md:w-20rem" /> */}
    </React.Fragment>)
}
