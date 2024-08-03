.text

#The program checks the ALU instruction in R_type

Main:
		addi    x15 , x0 , 0 
		addi    x28 , x0 , -99 
		addi    x3 , x0 , 73 
		addi    x18 , x0 , 197 
		addi    x6 , x0 , 1 
		blt     x15 , x28 , Less_r 
		bge     x15 , x28 , Bigger_r 
Less_r:
		sub     x13 , x3 , x18 
		and     x24 , x3 , x18 
		add     x24 , x24 , x13 
		srl     x24 , x24 , x6 
		addi    x8 , x0 , -30 
		bne     x24 , x8 , Fail 
Bigger_r:
		or      x13 , x3 , x18 
		xor     x24 , x3 , x18 
		add     x24 , x24 , x13 
		sra     x24 , x24 , x6 
		addi    x8 , x0 , 172 
		bne     x24 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
