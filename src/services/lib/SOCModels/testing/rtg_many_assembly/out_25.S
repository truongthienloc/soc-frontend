.text

#The program checks the ALU instruction in R_type

Main:
		addi    x7 , x0 , 53 
		addi    x16 , x0 , -46 
		addi    x20 , x0 , 183 
		addi    x29 , x0 , 80 
		addi    x31 , x0 , 4 
		blt     x7 , x16 , Less_r 
		bge     x7 , x16 , Bigger_r 
Less_r:
		sub     x9 , x20 , x29 
		and     x5 , x20 , x29 
		slt     x5 , x5 , x9 
		srl     x5 , x5 , x31 
		addi    x24 , x0 , 7 
		bne     x5 , x24 , Fail 
Bigger_r:
		or      x9 , x20 , x29 
		xor     x5 , x20 , x29 
		sltu     x5 , x5 , x9 
		sra     x5 , x5 , x31 
		addi    x24 , x0 , 29 
		bne     x5 , x24 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
