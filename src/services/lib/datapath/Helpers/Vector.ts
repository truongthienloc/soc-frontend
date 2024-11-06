import { Point } from '../types'

export default class Vector {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public static fromPoints(sPoint: Point, dPoint: Point): Vector {
        return new Vector(dPoint.x - sPoint.x, dPoint.y - sPoint.y)
    }

    public static fromXY(sx: number, sy: number, dx: number, dy: number): Vector {
        return new Vector(dx - sx, dy - sy)
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y)
    }

    public subtract(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y)
    }

    public multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    public divide(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar)
    }

    public dot(v: Vector): number {
        return this.x * v.x + this.y * v.y
    }

    public cross(v: Vector): number {
        return this.x * v.y - this.y * v.x
    }

    public normalize(): Vector {
        const length = this.length
        return new Vector(this.x / length, this.y / length)
    }

    public radian(): number {
        return Math.atan2(this.y, this.x) + Math.PI / 2
    }

    public angle(): number {
        return (this.radian() * 180) / Math.PI
    }

    public rotate(radian: number): Vector {
        const x = this.x * Math.cos(radian) - this.y * Math.sin(radian)
        const y = this.x * Math.sin(radian) + this.y * Math.cos(radian)
        return new Vector(x, y)
    }
}
