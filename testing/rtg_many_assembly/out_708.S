.text

#The program checks the ALU instruction in R_type

Main:
		addi    x30 , x0 , 174 
		addi    x24 , x0 , 75 
		addi    x27 , x0 , 43 
		addi    x31 , x0 , 120 
		addi    x15 , x0 , 1 
		blt     x30 , x24 , Less_r 
		bge     x30 , x24 , Bigger_r 
Less_r:
		sub     x12 , x27 , x31 
		and     x3 , x27 , x31 
		slti    x3 , x3 , 151 
		srl     x3 , x3 , x15 
		addi    x17 , x0 , -19 
		bne     x3 , x17 , Fail 
Bigger_r:
		or      x12 , x27 , x31 
		xor     x3 , x27 , x31 
		sltiu   x3 , x3 , 39 
		sra     x3 , x3 , x15 
		addi    x17 , x0 , 103 
		bne     x3 , x17 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
