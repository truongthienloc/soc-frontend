.text

#The program checks the ALU instruction in R_type

Main:
		addi    x1 , x0 , 183 
		addi    x4 , x0 , 84 
		addi    x12 , x0 , 21 
		addi    x31 , x0 , 43 
		addi    x6 , x0 , 3 
		blt     x1 , x4 , Less_r 
		bge     x1 , x4 , Bigger_r 
Less_r:
		sub     x23 , x12 , x31 
		and     x18 , x12 , x31 
		slti    x18 , x18 , 168 
		srl     x18 , x18 , x6 
		addi    x5 , x0 , -3 
		bne     x18 , x5 , Fail 
Bigger_r:
		or      x23 , x12 , x31 
		xor     x18 , x12 , x31 
		sltiu   x18 , x18 , 126 
		sra     x18 , x18 , x6 
		addi    x5 , x0 , 15 
		bne     x18 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
