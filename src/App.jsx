import { useEffect, useRef, useState } from 'react'
import './App.css'

function useRevealAndParallax() {
  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll('.reveal'))
    const manifestoEls = Array.from(document.querySelectorAll('.manifesto-line'))
    const parallaxEls = Array.from(document.querySelectorAll('.parallax'))

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('active')
      })
    }, { threshold: 0.1 })

    revealEls.forEach((el) => io.observe(el))
    manifestoEls.forEach((el) => io.observe(el))

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          parallaxEls.forEach((el) => {
            const rect = el.getBoundingClientRect()
            const offset = rect.top - window.innerHeight / 2
            const strength = parseFloat(el.getAttribute('data-speed') || '0.04')
            const y = -offset * strength
            el.style.transform = `translateY(${y}px)`
          })
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // jitter pulse without gradients
    const jitterTargets = Array.from(document.querySelectorAll('.jitter'))
    const jitterInterval = setInterval(() => {
      jitterTargets.forEach((el) => {
        el.classList.add('jittering')
        setTimeout(() => el.classList.remove('jittering'), 300)
      })
    }, 4200)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearInterval(jitterInterval)
    }
  }, [])
}

function Hero() {
  return (
    <section className="hero light">
      <div className="container">
        <img src="/atoken-nobg.png" alt="A Token" className="token-logo" />
        <h1 className="reveal">
          It’s just <span className="glow">A</span> Token.
        </h1>
        <p className="reveal small" style={{ marginTop: 14 }}>
          Or maybe it’s the token.
        </p>
        <div className="btns reveal" style={{ marginTop: 28 }}>
          <a className="button primary" href="https://jup.ag/" target="_blank" rel="noopener noreferrer">Buy $ATOKEN</a>
          <a className="button secondary" href="https://x.com" target="_blank" rel="noopener noreferrer">Join the Community</a>
        </div>
      </div>
    </section>
  )
}

function WhatIs() {
  return (
    <section className="dark">
      <div className="container">
        <h2 className="reveal">What even is A Token?</h2>
        <div className="flow" style={{ marginTop: 24 }}>
          <p className="lead reveal">
            <strong>
              A crypto token is a digital asset created on an existing blockchain. It doesn’t have its own chain. It doesn’t need one. It represents an idea — a unit of belief, value, and possibility.
            </strong>
          </p>
          <p className="reveal">
            <strong>So we asked:</strong><br/>
            <em>What if we made A Token that doesn’t pretend to be anything else?</em><br/>
            <em>No roadmap. No whitepaper. No lies. Just A Token.</em>
          </p>
        </div>
      </div>
    </section>
  )
}

function WhatIfs() {
  const lines = [
    'What if it goes to a billion dollars?',
    'What if it solves world hunger?',
    'What if it becomes the reason your ex texts you back?',
    'What if it’s just... ',
  ]
  const [active, setActive] = useState(0)
  const stackRef = useRef(null)

  useEffect(() => {
    const el = stackRef.current
    if (!el) return
    let intervalId
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // start cycling through lines, one visible at a time
          clearInterval(intervalId)
          intervalId = setInterval(() => {
            setActive((prev) => (prev + 1) % lines.length)
          }, 2400)
        } else {
          clearInterval(intervalId)
        }
      })
    }, { threshold: 0.3 })
    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(intervalId)
    }
  }, [])

  return (
    <section className="light">
      <div className="container">
        <div className="whatifs-stack" ref={stackRef}>
          {lines.map((text, i) => (
            <h2 key={i} className={`whatif-line ${active === i ? 'active' : ''}`}>
              {text}
              {i === 3 && (<span className="jitter">A Token</span>)}
            </h2>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <p className="reveal">Every token starts with a question.</p>
          <p className="reveal">Every degen starts with belief.</p>
          <p className="reveal">Every legend starts with A Token.</p>
        </div>
      </div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="dark">
      <div className="container">
        <h2 className="reveal">The purest form of crypto minimalism.</h2>
        <p className="reveal" style={{ marginTop: 12 }}>
          In a world of over-promises, we under-deliver — intentionally.
        </p>
        <p className="reveal">No roadmaps. No utilities. No founders doing AMAs in hoodies.</p>
        <p className="reveal">Just the truth: This is A Token.</p>
      </div>
    </section>
  )
}

function Manifesto() {
  return (
    <section className="light">
      <div className="container">
        <h2 className="reveal">A Manifesto for A Token Generation</h2>
        <div className="lines-grid manifesto-grid" style={{ marginTop: 18 }}>
          <div className="block dark">
            <p className="line">We believe in nothing.</p>
            <p className="line">And somehow, that’s everything.</p>
          </div>
          <div className="block dark"><p className="line">We don’t build. We meme.</p></div>
          <div className="block dark"><p className="line">We don’t plan. We manifest.</p></div>
          <div className="block dark"><p className="line em">We don’t hold the line. We hold A Token.</p></div>
        </div>
        <div className="btns reveal" style={{ marginTop: 24 }}>
          <a className="button primary" href="https://pump.fun/" target="_blank" rel="noopener noreferrer">Buy A Token. Or don’t.</a>
        </div>
      </div>
    </section>
  )
}

function Community() {
  return (
    <section className="dark">
      <div className="container">
        <h2 className="reveal">Join the believers.</h2>
        <p className="reveal" style={{ marginTop: 12 }}>
          There’s no Discord. There’s no roadmap.
        </p>
        <p className="reveal">There’s just X, and a bunch of people who think this could be something.</p>
        <p className="reveal">Because sometimes, all it takes... is A Token.</p>
        <div className="btns reveal" style={{ marginTop: 20 }}>
          <a className="button secondary" href="https://x.com" target="_blank" rel="noopener noreferrer">Join X Community</a>
          <a className="button secondary" href="https://x.com" target="_blank" rel="noopener noreferrer">Follow on X</a>
          <a className="button primary" href="https://jup.ag/" target="_blank" rel="noopener noreferrer">Buy A Token</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="light">
      <div className="small">© 2025 A Token.<br/>Not a coin. Not a promise. Just A Token.</div>
      <div className="links" style={{ marginTop: 12 }}>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
        <a href="https://solscan.io" target="_blank" rel="noopener noreferrer">Solscan</a>
        <a href="https://pump.fun" target="_blank" rel="noopener noreferrer">Pump.fun</a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
    </footer>
  )
}

function App() {
  useRevealAndParallax()
  return (
    <>
      <Hero />
      <WhatIs />
      <WhatIfs />
      <Philosophy />
      <Manifesto />
      <Community />
      <Footer />
    </>
  )
}

export default App
