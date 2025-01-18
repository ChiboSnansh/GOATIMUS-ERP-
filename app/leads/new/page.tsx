import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import NewLeadForm from './new-lead-form'

export default function NewLead() {
  async function addLead(formData: FormData) {
    'use server'
    
    const supabase = createServerComponentClient({ cookies })
    const lead = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      status: formData.get('status') as string,
    }

    const { error } = await supabase.from('leads').insert([lead])
    if (error) {
      console.error('Error adding new lead:', error)
      return { error: 'Failed to add lead' }
    }

    redirect('/leads')
  }

  return <NewLeadForm addLead={addLead} />
}

