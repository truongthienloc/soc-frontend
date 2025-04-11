import React from 'react'
import { cn } from '~/helpers/cn'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export default function Keyboard({ className, ...props}: Props) {
  return (
    <div {...props} className={cn("keyboard", className)} id="keyboard"> 
      <div className="row">
        <button className="btn">1</button>
        <button className="btn">2</button>
        <button className="btn">3</button>
        <button className="btn">4</button>
        <button className="btn">5</button>
        <button className="btn">6</button>
        <button className="btn">7</button>
        <button className="btn">8</button>
        <button className="btn">9</button>
        <button className="btn">0</button>
        <button className="delete">Del</button>
      </div>
      <div className="row">
        <button className="btn">q</button>
        <button className="btn">w</button>
        <button className="btn">e</button>
        <button className="btn">r</button>
        <button className="btn">t</button>
        <button className="btn">y</button>
        <button className="btn">u</button>
        <button className="btn">i</button>
        <button className="btn">o</button>
        <button className="btn">p</button>
      </div>
      <div className="row">
        <button className="btn">a</button>
        <button className="btn">s</button>
        <button className="btn">d</button>
        <button className="btn">f</button>
        <button className="btn">g</button>
        <button className="btn">h</button>
        <button className="btn">j</button>
        <button className="btn">k</button>
        <button className="btn">l</button>
        <button className="enter">Enter</button>
      </div>
      <div className="row">
        <button className="btn">z</button>
        <button className="btn">x</button>
        <button className="btn">c</button>
        <button className="btn">v</button>
        <button className="btn">b</button>
        <button className="btn">n</button>
        <button className="btn">m</button>
        <button className="shift">Shift</button>
      </div>
      <div className="row">
        <button className="space">Space</button>
      </div>
    </div>
  )
}
