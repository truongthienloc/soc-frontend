.text

#A function double in RISC-V that, when given an integer x, returns 2x

Initial:
		addi    x23 , x0 , 8 // 0
		addi    x24 , x0 , 213 // 4
		addi    x25 , x0 , 154 // 8
		addi    x26 , x0 , 167 // 12
		addi    x27 , x0 , 114  // 16
		addi    x28 , x0 , 485 // 20
		addi    x29 , x0 , 2  // 24
		addi    x30 , x0 , 237  // 28
		addi    x31 , x0 , 278 // 32
Main:
		add     x23 , x23 , x23 // 36 
		xor     x24 , x24 , x24 // 40
		sub     x25 , x25 , x25 // 44
		srl     x26 , x26 , x26 // 48
		and     x27 , x27 , x27 // 52
		sra     x28 , x28 , x28 // 56
		sll     x29 , x29 , x29 // 60
		or      x30 , x30 , x30 // 64
		add     x31 , x31 , x31 // 68
Result:
		addi    x2 , x0 , 16 // 72 
		addi    x3 , x0 , 0 
		addi    x4 , x0 , 0 
		addi    x5 , x0 , 1 
		addi    x6 , x0 , 114 
		addi    x7 , x0 , 15 
		addi    x8 , x0 , 8 
		addi    x9 , x0 , 237 
		addi    x10 , x0 , 556 
		bne     x23 , x2 , Fail 
		bne     x24 , x3 , Fail 
		bne     x25 , x4 , Fail 
		bne     x26 , x5 , Fail 
		bne     x27 , x6 , Fail 
		bne     x28 , x7 , Fail 
		bne     x29 , x8 , Fail 
		bne     x30 , x9 , Fail 
		bne     x31 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
