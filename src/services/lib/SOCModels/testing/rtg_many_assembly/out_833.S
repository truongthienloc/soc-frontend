.text

#The program checks the ALU instruction in R_type

Main:
		addi    x25 , x0 , 64 
		addi    x9 , x0 , -35 
		addi    x11 , x0 , 110 
		addi    x3 , x0 , 5 
		addi    x15 , x0 , 3 
		blt     x25 , x9 , Less_r 
		bge     x25 , x9 , Bigger_r 
Less_r:
		sub     x1 , x11 , x3 
		and     x4 , x11 , x3 
		slti    x4 , x4 , 158 
		srl     x4 , x4 , x15 
		addi    x28 , x0 , 13 
		bne     x4 , x28 , Fail 
Bigger_r:
		or      x1 , x11 , x3 
		xor     x4 , x11 , x3 
		sltiu   x4 , x4 , 19 
		sra     x4 , x4 , x15 
		addi    x28 , x0 , 27 
		bne     x4 , x28 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
