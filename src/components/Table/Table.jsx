import { Icons } from 'components'

import styles from './table.module.scss'

const Row = (props) => {
  const { columns, row, onRemove } = props

  const cells = columns.map((column, i) => {
    const current = Object.entries(row).find(
      ([key, value]) => key === column.name,
    )

    return {
      key: current?.[0] ?? `column-${i}`,
      value: current?.[1] ?? null,
    }
  })

  return (
    <tr>
      {cells.map((cell) => (
        <td key={cell.key}>{cell.value}</td>
      ))}

      {onRemove ? (
        <td className={styles.removeCell}>
          <Icons.Trash onClick={() => onRemove(row)} />
        </td>
      ) : null}
    </tr>
  )
}

const Table = (props) => {
  const { className, columns, rows, onRemove } = props

  return (
    <div className={className}>
      <table className={styles.table}>
        {columns?.length ? (
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{column.title}</th>
              ))}
              {onRemove ? <th /> : null}
            </tr>
          </thead>
        ) : null}

        {rows?.length ? (
          <tbody>
            {rows.map((row) => (
              <Row
                key={row.id}
                columns={columns}
                row={row}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  )
}

export default Table
