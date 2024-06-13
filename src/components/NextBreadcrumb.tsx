'use client'

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const NextBreadcrumb = ({
    homeElement,
    separator,
    containerClasses = "breadcrumb-container",
    listClasses = "breadcrumb-item",
    activeClasses = "active",
    capitalizeLinks = true
}: TBreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    if (pathNames.length === 0) {
        return null; // Return null if there are no additional paths (i.e., only the root path)
    }

    return (
        <div>
            <ul className={containerClasses}>
                {pathNames.length > 0 && (
                    <React.Fragment>
                        <li className={listClasses}>
                            <Link href='/'>{homeElement}</Link>
                        </li>
                        {separator}
                    </React.Fragment>
                )}
                {pathNames.map((link, index) => {
                    const href = `/${pathNames.slice(0, index + 1).join('/')}`
                    const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                    const itemLink = capitalizeLinks ? link.charAt(0).toUpperCase() + link.slice(1) : link

                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses}>
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>
    )
}

export default NextBreadcrumb
