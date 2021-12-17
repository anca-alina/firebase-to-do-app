import React from 'react'
import Link from 'next/link'

const styles = {
  content: {
    padding: '4px 32px 32px 32px',
    background: '#blue',
    display: 'inline-block',
  },
  linkAnchor: {
    color: 'teal',
    display: 'block',
    lineHeight: '160%',
  },
}

const DemoPageLinks = () => (
  <div style={styles.content}>
    <h4>Useful Links</h4>
    <div>
      <Link href="/">
        <a style={styles.linkAnchor}>Back to Home</a>
      </Link>
      <Link href="/todo">
        <a style={styles.linkAnchor}>
          Add a ToDo
        </a>
      </Link>
      <Link href="/events">
        <a style={styles.linkAnchor}>Add a Event</a>
      </Link>
      <Link href="/birthday">
        <a style={styles.linkAnchor}>
          Add a Birthday
        </a>
      </Link>
    </div>
  </div>
)

DemoPageLinks.displayName = 'DemoPageLinks'

export default DemoPageLinks
