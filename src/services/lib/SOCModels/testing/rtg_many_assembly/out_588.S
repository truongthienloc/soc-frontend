.text

#The program checks the ALU instruction in R_type

Main:
		addi    x18 , x0 , 89 
		addi    x1 , x0 , -10 
		addi    x20 , x0 , 24 
		addi    x17 , x0 , 179 
		addi    x6 , x0 , 4 
		blt     x18 , x1 , Less_r 
		bge     x18 , x1 , Bigger_r 
Less_r:
		sub     x14 , x20 , x17 
		and     x31 , x20 , x17 
		slti    x31 , x31 , 95 
		srl     x31 , x31 , x6 
		addi    x7 , x0 , -9 
		bne     x31 , x7 , Fail 
Bigger_r:
		or      x14 , x20 , x17 
		xor     x31 , x20 , x17 
		sltiu   x31 , x31 , 3 
		sra     x31 , x31 , x6 
		addi    x7 , x0 , 22 
		bne     x31 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
