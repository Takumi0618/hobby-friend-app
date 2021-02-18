import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff5c5",
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 16px)',
      margin: 8,
    },
    [theme.breakpoints.up('sm')]: {
      width: 'calc(50% - 32px)',
      margin: 16,
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(33.333% - 32px)',
      margin: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  category: {
    color: "orange",
    margin: "5px auto"
  },
  memo: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  header: {
    display: "block",
    height: 120,
  },
  title: {
    fontSize: 120,
  },
}));

const BoardCard = (props) => {
  const classes = useStyles();

  const timestampToTime = useCallback((timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const yyyy = `${date.getFullYear()}`;

    // .slice(-2)で文字列中の末尾の2文字を取得する
    // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
    const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
    const dd = `0${date.getDate()}`.slice(-2);
    const HH = `0${date.getHours()}`.slice(-2);
    const mm = `0${date.getMinutes()}`.slice(-2);
    const ss = `0${date.getSeconds()}`.slice(-2);

    return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
  }, [props])
  
  const categoryIdToName = (categoryId) => {
    const categories = [
      {id: "sports", name: "スポーツ"},
      {id: "music", name: "音楽"},
      {id: "game", name: "ゲーム"},
      {id: "cartoon", name: "アニメ"},
      {id: "books", name: "読書"},
      {id: "entertainment", name: "エンタメ"},
      {id: "business", name: "ビジネス"},
      {id: "food", name: "グルメ"},
      {id: "sweets", name: "スイーツ"},
    ];
    for(let i = 0; i < categories.length; i++) {
      if (categoryId === categories[i].id) {
        return categories[i].name
      }
    }
  }


  return (
    <Card className={classes.root}>
      <div className={classes.category}>{categoryIdToName(props.category)}</div>
      <CardHeader
        className={classes.header}
        title={props.title}
        subheader={timestampToTime(props.updated_at)}
      />
      {props.image.path === "" ? (
        <CardMedia
          className={classes.media}
          image="/img/no_image.jpg"
        />
      ):(
        <CardMedia
          className={classes.media}
          image={props.image.path}
        />
      )}
      <CardContent>
        <Typography className={classes.memo} variant="body2" color="textSecondary" component="p">
          {props.memo}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BoardCard;