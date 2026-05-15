import 'dotenv/config'
import CreateSquadClient from '@squadco/js'

const squad = new CreateSquadClient(
  process.env.SQUADCO_PUBLIC_KEY as string,
  process.env.SQUADCO_SECRET_KEY as string,
  'development',
)

async function main() {
  const paymentResponse = await squad.initiatePayment(
    {
      amount: 10_000 * 100, // amount in kobo
      email: 'daveisno1@gmail.com',
      initiateType: 'inline',
      currency: 'NGN',
    },
    false,
  )
  console.log({ paymentResponse })

  const verificationResponsePre = await squad.verifyTransaction({
    transactionRef: paymentResponse.data!.transaction_ref,
  })
  console.log({ verificationResponsePre })

  await waitForKey()
  console.log('Verifying transaction...')

  const verificationResponsePost = await squad.verifyTransaction({
    transactionRef: paymentResponse.data!.transaction_ref,
  })
  console.log({ verificationResponsePost })
}

function waitForKey(): Promise<void> {
  return new Promise((resolve) => {
    console.log('Press any key to continue...')
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.on('data', () => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      resolve()
    })
  })
}

main()
