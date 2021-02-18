import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { TextInput } from '../UIkit';
import { db } from '../../firebase';
import IconButton from "@material-ui/core/IconButton";
import { fetchBoards, searchKeyword } from '../../reducks/bulletinBoards/operations';

const useStyles = makeStyles({
  button: {
    backgroundColor: "#fff5c5",
    marginLeft: 10
  },
  search: {
    display: "flex",
    alignItems: "center"
  }
})

const BoardNav = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState([]);
  const [keyword, setKeyword] = useState('');

  const selectMenu = (event, path) => {
    dispatch(push(path))
    handleClose(event);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword]);

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const category = snapshot.data();
          list.push({func: selectMenu, label: category.name,  id: category.id, value: `/?category=${category.id}`})
        })
        setFilters(list)
      })
  }, [])

  return (
    <nav>
      <div className="p-grid__row">
        <Button className={classes.button} onClick={() => dispatch(push('/board/create'))} >
          作成する
        </Button>
        <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <SearchIcon />
          絞り込む
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className={classes.search}>
            <IconButton onClick={() => dispatch(searchKeyword(keyword))}>
              <SearchIcon/>
            </IconButton>
            <TextInput
              fullWidth={false} label={"キーワードを入力"} multiline={false} required={false} rows={1}
              value={keyword} type={"text"} onChange={(e) => inputKeyword(e)}
            />
          </div>
          <Divider />
          <MenuItem onClick={() => dispatch(fetchBoards())}>
            すべて
          </MenuItem>
          {filters.map(filter => (
            <MenuItem
              key={filter.id}
              onClick={(e) => filter.func(e, filter.value)}
            >
              {filter.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="module-spacer--extra-extra-small" />
      <Divider />
    </nav>
  )
}

export default BoardNav;