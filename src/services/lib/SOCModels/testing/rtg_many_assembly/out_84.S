.text

#The program checks the ALU instruction in R_type

Main:
		addi    x14 , x0 , 48 
		addi    x26 , x0 , -51 
		addi    x9 , x0 , 117 
		addi    x19 , x0 , 96 
		addi    x2 , x0 , 4 
		blt     x14 , x26 , Less_r 
		bge     x14 , x26 , Bigger_r 
Less_r:
		sub     x23 , x9 , x19 
		and     x8 , x9 , x19 
		add     x8 , x8 , x23 
		srl     x8 , x8 , x2 
		addi    x12 , x0 , 7 
		bne     x8 , x12 , Fail 
Bigger_r:
		or      x23 , x9 , x19 
		xor     x8 , x9 , x19 
		add     x8 , x8 , x23 
		sra     x8 , x8 , x2 
		addi    x12 , x0 , 8 
		bne     x8 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
