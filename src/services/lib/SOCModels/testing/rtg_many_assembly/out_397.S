.text

#The program checks the ALU instruction in R_type

Main:
		addi    x16 , x0 , 195 
		addi    x18 , x0 , 96 
		addi    x30 , x0 , 115 
		addi    x17 , x0 , 48 
		addi    x19 , x0 , 3 
		blt     x16 , x18 , Less_r 
		bge     x16 , x18 , Bigger_r 
Less_r:
		sub     x7 , x30 , x17 
		and     x9 , x30 , x17 
		add     x9 , x9 , x7 
		srl     x9 , x9 , x19 
		addi    x10 , x0 , 14 
		bne     x9 , x10 , Fail 
Bigger_r:
		or      x7 , x30 , x17 
		xor     x9 , x30 , x17 
		add     x9 , x9 , x7 
		sra     x9 , x9 , x19 
		addi    x10 , x0 , 22 
		bne     x9 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
