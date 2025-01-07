.text

#The program checks the ALU instruction in R_type

Main:
		addi    x21 , x0 , 103 
		addi    x13 , x0 , 4 
		addi    x10 , x0 , 165 
		addi    x9 , x0 , 155 
		addi    x6 , x0 , 3 
		blt     x21 , x13 , Less_r 
		bge     x21 , x13 , Bigger_r 
Less_r:
		sub     x20 , x10 , x9 
		and     x30 , x10 , x9 
		slti    x30 , x30 , 196 
		srl     x30 , x30 , x6 
		addi    x27 , x0 , 17 
		bne     x30 , x27 , Fail 
Bigger_r:
		or      x20 , x10 , x9 
		xor     x30 , x10 , x9 
		sltiu   x30 , x30 , 178 
		sra     x30 , x30 , x6 
		addi    x27 , x0 , 31 
		bne     x30 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
