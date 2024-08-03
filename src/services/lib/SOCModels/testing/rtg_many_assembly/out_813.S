.text

#The program checks the ALU instruction in R_type

Main:
		addi    x9 , x0 , 147 
		addi    x23 , x0 , 48 
		addi    x16 , x0 , 195 
		addi    x15 , x0 , 7 
		addi    x5 , x0 , 0 
		blt     x9 , x23 , Less_r 
		bge     x9 , x23 , Bigger_r 
Less_r:
		sub     x12 , x16 , x15 
		and     x20 , x16 , x15 
		slti    x20 , x20 , 112 
		srl     x20 , x20 , x5 
		addi    x6 , x0 , 191 
		bne     x20 , x6 , Fail 
Bigger_r:
		or      x12 , x16 , x15 
		xor     x20 , x16 , x15 
		sltiu   x20 , x20 , 193 
		sra     x20 , x20 , x5 
		addi    x6 , x0 , 395 
		bne     x20 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
