'use client'

import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [html, setHtml] = useState('')
  const containerRef = useRef(null)
  const initialized = useRef(false)

  useEffect(() => {
    fetch('/content.html')
      .then(res => res.text())
      .then(data => {
        const bodyMatch = data.match(/<body[^>]*>([\s\S]*)<\/body>/i)
        if (bodyMatch) {
          setHtml(bodyMatch[1])
        } else {
          setHtml(data)
        }
      })
  }, [])

  useEffect(() => {
    if (html && containerRef.current && !initialized.current) {
      initialized.current = true

      // Carregar script do formulário LeadConnector
      const formScript = document.createElement('script')
      formScript.src = 'https://link.msgsndr.com/js/form_embed.js'
      formScript.async = true
      document.body.appendChild(formScript)

      // Carregar Swiper CSS
      const swiperCSS = document.createElement('link')
      swiperCSS.rel = 'stylesheet'
      swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
      document.head.appendChild(swiperCSS)

      // Carregar Swiper JS e inicializar
      const swiperScript = document.createElement('script')
      swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
      swiperScript.async = true
      swiperScript.onload = () => {
        // Inicializar todos os carrosséis Swiper
        setTimeout(() => {
          initializeSwipers()
        }, 300)
      }
      document.body.appendChild(swiperScript)

      // Configurar botões para abrir o modal
      setTimeout(() => {
        const buttons = document.querySelectorAll('a.elementor-button')
        const formModal = document.getElementById('formModal')

        if (formModal) {
          buttons.forEach(btn => {
            btn.onclick = function(e) {
              e.preventDefault()
              e.stopPropagation()
              formModal.style.display = 'block'
              return false
            }
          })

          formModal.onclick = function(e) {
            if (e.target === formModal) {
              formModal.style.display = 'none'
            }
          }
        }
      }, 500)
    }
  }, [html])

  // Função para inicializar Swipers
  const initializeSwipers = () => {
    if (typeof window !== 'undefined' && window.Swiper) {
      const swiperContainers = document.querySelectorAll('.elementor-image-carousel-wrapper.swiper')

      swiperContainers.forEach((container) => {
        // Destruir instância existente se houver
        if (container.swiper) {
          container.swiper.destroy(true, true)
        }

        // Criar nova instância do Swiper com animação contínua
        new window.Swiper(container, {
          slidesPerView: 2,
          spaceBetween: 10,
          loop: true,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          },
          speed: 4000,
          freeMode: true,
          freeModeMomentum: false,
          allowTouchMove: true,
          breakpoints: {
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          },
        })
      })
    }
  }

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
