import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
    <div>
        <FilterLink filter="SHOW_ALL">All</FilterLink>
        <FilterLink filter="SHOW_ACTIVE">active</FilterLink>
        <FilterLink filter="SHOW_COMPLETED">completed</FilterLink>
    </div>
)

export default Footer