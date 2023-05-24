// PingButton.tsx

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import { FC } from "react";
import styles from "../styles/PingButton.module.css";

const PROGRAM_ID = new Web3.PublicKey(
  "EM2bqXe7njj5j6jfNujBgqRTaUDFriNtq5mzJeBnnf6a"
);

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = () => {
    if (!connection || !publicKey) {
      alert("Please connect your wallet first lol");
      return;
    }

    const transaction = new Web3.Transaction();

    const instruction = new Web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: true,
        },
      ],
      programId: PROGRAM_ID,
    });

    transaction.add(instruction);
    sendTransaction(transaction, connection).then((sig) => {
      console.log(
        `Explorer URL: https://explorer.solana.com/tx/${sig}?cluster=devnet`
      );
    });
  };

  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <button className={styles.button}>Ping!</button>
    </div>
  );
};
