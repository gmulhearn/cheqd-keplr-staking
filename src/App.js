import { Box, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { signTxAndBroadcast } from './StakeHelper';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: "2em",
    margin: "4em",
    minWidth: "15em"
  },
  textfield: {
    color: "white"
  }
}))

const mainnet_anonyome_tx = { // updatedTx
  "msg": {
    "typeUrl": "/cosmos.staking.v1beta1.MsgDelegate",
    "value": {
      "delegatorAddress": "cheqd1wtnqqzs2pk05vvttc3cy6pq5shmx9fqnaxdrq2",
      "validatorAddress": "cheqdvaloper1djh8syeug9ylw7v8ca6jvq3s59klzmm4fm949w",
      "amount": {
        "amount": "10000000000",
        "denom": "ncheq"
      }
    }
  },
  "fee": {
    "amount": [
      {
        "amount": "10000000",
        "denom": "ncheq"
      }
    ],
    "gas": "200000"
  },
  "memo": ""
}

function App() {
  const classes = useStyles()

  const [stakeAmount, setStakeAmount] = useState("")
  const [delegatorAddr, setDelegatorAddr] = useState("")
  const [validatorAddr, setValidatorAddr] = useState("")

  const stakeClick = () => {
    signTxAndBroadcast(mainnet_anonyome_tx, "cheqd1wtnqqzs2pk05vvttc3cy6pq5shmx9fqnaxdrq2", () => { })
  }

  return (
    <div className="App">
      <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
        <Paper elevator={3} className={classes.paper}>
          <Typography variant="h4" margin={"1em"} textAlign={"center"}>Keplr Staking</Typography>
          <TextField fullWidth placeholder='Stake amount (CHEQ)...' onChange={(e) => setStakeAmount(e.target.value)}></TextField>
          <TextField fullWidth placeholder='Your Keplr address (cheqd1wt...)' onChange={(e) => setDelegatorAddr(e.target.value)}></TextField>
          <TextField fullWidth placeholder='Validator address (cheqdvaloper1d...)' onChange={(e) => setValidatorAddr(e.target.value)}></TextField>
          <Button variant="contained" fullWidth style={{ marginTop: "2em" }} onClick={stakeClick}>Stake</Button>
        </Paper>
      </Box>
    </div>

  );
}

export default App;
