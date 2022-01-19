import { Box, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { constructTx, signTxAndBroadcast } from './StakeHelper';
import { mainnetConfig, testnetConfig } from './config';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: "2em",
    margin: "4em",
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
  const [network, setNetwork] = useState("Testnet")

  useEffect(async () => {
    window.onload = async () => {
      await window.keplr.enable(testnetConfig.CHAIN_ID);
      await window.keplr.enable(mainnetConfig.CHAIN_ID);

      const offlineSigner = window.keplr.getOfflineSigner(mainnetConfig.CHAIN_ID);
      const accounts = await offlineSigner.getAccounts();

      if (accounts[0]) {
        console.log(accounts)
        setDelegatorAddr(accounts[0].address)
      }
    }

  }, [])

  const stakeClick = () => {
    const tx = constructTx(delegatorAddr, validatorAddr, stakeAmount, network)
    signTxAndBroadcast(tx, delegatorAddr, network, () => { })
  }

  return (
    <div className="App">
      {/* <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}> */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevator={3} className={classes.paper}>
            <Typography variant="h4" margin={"1em"} textAlign={"center"}>Keplr Staking</Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Select
                value={network}
                onChange={(e) => { setNetwork(e.target.value) }}
              >
                <MenuItem value="Testnet">Testnet</MenuItem>
                <MenuItem value="Mainnet">Mainnet</MenuItem>
              </Select>
              <OutlinedInput fullWidth placeholder='Stake amount (CHEQ)...' onChange={(e) => setStakeAmount(e.target.value)}
                endAdornment={<InputAdornment position="end">CHEQ</InputAdornment>}
              ></OutlinedInput>
              <TextField fullWidth value={delegatorAddr} placeholder='Your Keplr address (cheqd1wt...)' onChange={(e) => setDelegatorAddr(e.target.value)}></TextField>
              <TextField fullWidth placeholder='Validator address (cheqdvaloper1d...)' onChange={(e) => setValidatorAddr(e.target.value)}></TextField>
              <Button variant="contained" color='secondary' fullWidth style={{ marginTop: "2em" }} onClick={stakeClick}>Stake</Button>
            </Box>

          </Paper>
        </Grid>
      </Grid>

      {/* </Box> */}
    </div>

  );
}

export default App;
