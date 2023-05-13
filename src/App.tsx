import React, { MouseEvent, MouseEventHandler, ReactNode } from "react";
import Board from './components/Board';
import Message from './components/Message';
import Piece, {Props as PieceProperties} from "./components/Piece";
import PlayerSelect from './components/PlayerSelect';
import { GameState, Move, Position } from "./interfaces/Shared";

import { DraughtsSquare1D, DraughtsPlayer } from "rapid-draughts";
import {
  EnglishDraughts as Draughts,
  EnglishDraughtsComputerFactory as ComputerFactory
} from 'rapid-draughts/english';

import { numberToPosition } from './Util';

interface Props {};
interface State {
  gameState: GameState
};

class App extends React.Component<Props, State> {
  private draughts;
  private alphaBetaComputer = ComputerFactory.alphaBeta({ maxDepth: 7 });
  
  constructor(props: Props) {
    super(props);   
    this.draughts = Draughts.setup();
    this.state = { gameState: this.populateGameState() };   
  }

  private populateGameState = (
      highlights: Position[]=[],
      pieceSelected: PieceProperties|undefined=undefined,
      numberOfPlayers: 1|2|undefined=undefined
    ): GameState => {
    const {board, moves, player} = this.draughts;
    const color = player === DraughtsPlayer.DARK ? Piece.Color.black : Piece.Color.red;
    const pieces: PieceProperties[] = this.populatePieces(board);
    if (this.state === undefined) {
      numberOfPlayers = 1;
    }
    if (numberOfPlayers === undefined) {
      numberOfPlayers = this.state.gameState.numberOfPlayers;
    }
    return {
      pieces,
      currentPlayer: color,
      highlights,
      pieceSelected,
      moves,
      numberOfPlayers
    };
  };

  private populatePieces = (board: DraughtsSquare1D[]) => {
    const pieces: PieceProperties[] = [];
    board.forEach((square: DraughtsSquare1D) => {
        if (square.piece === undefined) return;
        const color = square.piece.player === DraughtsPlayer.DARK ? Piece.Color.black : Piece.Color.red;
        const position = numberToPosition(square.position);
        pieces.push({
            color,
            crowned: square.piece.king,
            position
        });
    });
    return pieces;
  };

  private playerSelect = (numberOfPlayers: 1|2):MouseEventHandler => {
    return (event: MouseEvent): void => {
      this.draughts = Draughts.setup();
      const newGameState = this.populateGameState([], undefined, numberOfPlayers);
      this.setState({ gameState: newGameState });
    };    
  };

  private moveFunction = async (
    highlights: Position[], 
    pieceSelected: PieceProperties | undefined, 
    move: Move | void
  ): Promise<void> => {
    if (move) {
      this.draughts.move(move);      
      if (this.state.gameState.numberOfPlayers === 2) {
        const alphaBetaMove = await this.alphaBetaComputer(this.draughts);
        this.draughts.move(alphaBetaMove);
      }
    }    
    const newGameState = this.populateGameState(highlights, pieceSelected);
    this.setState({ gameState: newGameState });
  };

  public render(): ReactNode {
    const {gameState} = this.state;
    const {player} = this.draughts;
    const color = player === DraughtsPlayer.DARK ? Piece.Color.black : Piece.Color.red;
    const message = `Current player: ${color}`;
    return (
      <div className="app">
        <Message message={message} />
        <PlayerSelect onePlayer={this.playerSelect(1)} twoPlayer={this.playerSelect(2)} />
        <Board width={8} height={8} update={this.moveFunction} gameState={gameState}/>
      </div>
    );
  }

  

  

}

export default App;