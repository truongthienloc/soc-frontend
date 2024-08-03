.text

#The program checks the ALU instruction in R_type

Main:
		addi    x7 , x0 , 145 
		addi    x12 , x0 , 46 
		addi    x1 , x0 , 169 
		addi    x2 , x0 , 192 
		addi    x26 , x0 , 4 
		blt     x7 , x12 , Less_r 
		bge     x7 , x12 , Bigger_r 
Less_r:
		sub     x10 , x1 , x2 
		and     x9 , x1 , x2 
		slt     x9 , x9 , x10 
		srl     x9 , x9 , x26 
		addi    x3 , x0 , 6 
		bne     x9 , x3 , Fail 
Bigger_r:
		or      x10 , x1 , x2 
		xor     x9 , x1 , x2 
		sltu     x9 , x9 , x10 
		sra     x9 , x9 , x26 
		addi    x3 , x0 , 21 
		bne     x9 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
