.text

#The program checks the ALU instruction in R_type

Main:
		addi    x15 , x0 , 78 
		addi    x31 , x0 , -21 
		addi    x7 , x0 , 115 
		addi    x30 , x0 , 30 
		addi    x1 , x0 , 2 
		blt     x15 , x31 , Less_r 
		bge     x15 , x31 , Bigger_r 
Less_r:
		sub     x8 , x7 , x30 
		and     x14 , x7 , x30 
		add     x14 , x14 , x8 
		srl     x14 , x14 , x1 
		addi    x26 , x0 , 25 
		bne     x14 , x26 , Fail 
Bigger_r:
		or      x8 , x7 , x30 
		xor     x14 , x7 , x30 
		add     x14 , x14 , x8 
		sra     x14 , x14 , x1 
		addi    x26 , x0 , 59 
		bne     x14 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
