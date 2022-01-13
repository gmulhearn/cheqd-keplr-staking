import { Box, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { constructTx, signTxAndBroadcast } from './StakeHelper';
import { config } from './config';

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

function App() {
  const classes = useStyles()

  const [stakeAmount, setStakeAmount] = useState("")
  const [delegatorAddr, setDelegatorAddr] = useState("")
  const [validatorAddr, setValidatorAddr] = useState("")

  useEffect(async() => {
    await window.keplr.enable(config.CHAIN_ID);
    
        const offlineSigner = window.keplr.getOfflineSigner(config.CHAIN_ID);
        const accounts = await offlineSigner.getAccounts();

        if (accounts[0]) {
          console.log(accounts)
          setDelegatorAddr(accounts[0].address)
        }
  }, [])

  const stakeClick = () => {
    const tx = constructTx(delegatorAddr, validatorAddr, stakeAmount)
    signTxAndBroadcast(tx, delegatorAddr, () => { })
  }

  return (
    <div className="App">
      <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
        <Paper elevator={3} className={classes.paper}>
          <Typography variant="h4" margin={"1em"} textAlign={"center"}>Keplr Staking</Typography>
          <TextField fullWidth placeholder='Stake amount (CHEQ)...' onChange={(e) => setStakeAmount(e.target.value)}></TextField>
          <TextField fullWidth value={delegatorAddr} placeholder='Your Keplr address (cheqd1wt...)' onChange={(e) => setDelegatorAddr(e.target.value)}></TextField>
          <TextField fullWidth placeholder='Validator address (cheqdvaloper1d...)' onChange={(e) => setValidatorAddr(e.target.value)}></TextField>
          <Button variant="contained" fullWidth style={{ marginTop: "2em" }} onClick={stakeClick}>Stake</Button>
        </Paper>
      </Box>
    </div>

  );
}

export default App;
