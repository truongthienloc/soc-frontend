.text

#A function double in RISC-V that, when given an integer x, returns 2x

Initial:
		addi    x1 , x0 , 287 
		addi    x2 , x0 , 163 
		addi    x3 , x0 , 99 
		addi    x4 , x0 , 338 
		addi    x5 , x0 , 15 
		addi    x6 , x0 , 426 
		addi    x7 , x0 , 0 
		addi    x8 , x0 , 83 
		addi    x9 , x0 , 474 
Main:
		add     x1 , x1 , x1 
		xor     x2 , x2 , x2 
		sub     x3 , x3 , x3 
		srl     x4 , x4 , x4 
		and     x5 , x5 , x5 
		sra     x6 , x6 , x6 
		sll     x7 , x7 , x7 
		or      x8 , x8 , x8 
		add     x9 , x9 , x9 
Result:
		addi    x31 , x0 , 574 
		addi    x30 , x0 , 0 
		addi    x29 , x0 , 0 
		addi    x28 , x0 , 0 
		addi    x27 , x0 , 15 
		addi    x26 , x0 , 0 
		addi    x25 , x0 , 0 
		addi    x24 , x0 , 83 
		addi    x23 , x0 , 948 
		bne     x1 , x31 , Fail 
		bne     x2 , x30 , Fail 
		bne     x3 , x29 , Fail 
		bne     x4 , x28 , Fail 
		bne     x5 , x27 , Fail 
		bne     x6 , x26 , Fail 
		bne     x7 , x25 , Fail 
		bne     x8 , x24 , Fail 
		bne     x9 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
