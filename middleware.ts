import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Criar cliente Supabase
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Verificar se há token de autenticação
  const token = request.cookies.get('sb-access-token')?.value

  if (token) {
    const { data: { user } } = await supabase.auth.getUser(token)
    
    if (user) {
      // Usuário autenticado - permitir acesso
      return NextResponse.next()
    }
  }

  // Usuário não autenticado - redirecionar para login
  const loginUrl = new URL('/login', request.url)
  return NextResponse.redirect(loginUrl)
}

// Configurar rotas protegidas
export const config = {
  matcher: [
    '/',
    '/financeiro/:path*',
    '/saude/:path*',
    '/relacionamentos/:path*',
    '/chat/:path*',
  ],
}
