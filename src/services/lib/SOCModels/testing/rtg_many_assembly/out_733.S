.text

#The program checks the ALU instruction in R_type

Main:
		addi    x28 , x0 , 13 
		addi    x16 , x0 , -86 
		addi    x5 , x0 , 194 
		addi    x29 , x0 , 64 
		addi    x11 , x0 , 3 
		blt     x28 , x16 , Less_r 
		bge     x28 , x16 , Bigger_r 
Less_r:
		sub     x18 , x5 , x29 
		and     x17 , x5 , x29 
		slti    x17 , x17 , 28 
		srl     x17 , x17 , x11 
		addi    x12 , x0 , 24 
		bne     x17 , x12 , Fail 
Bigger_r:
		or      x18 , x5 , x29 
		xor     x17 , x5 , x29 
		sltiu   x17 , x17 , 57 
		sra     x17 , x17 , x11 
		addi    x12 , x0 , 40 
		bne     x17 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
