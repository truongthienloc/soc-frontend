.text

#The program checks the ALU instruction in R_type

Main:
		addi    x31 , x0 , 40 
		addi    x4 , x0 , -59 
		addi    x1 , x0 , 33 
		addi    x3 , x0 , 27 
		addi    x17 , x0 , 0 
		blt     x31 , x4 , Less_r 
		bge     x31 , x4 , Bigger_r 
Less_r:
		sub     x9 , x1 , x3 
		and     x8 , x1 , x3 
		add     x8 , x8 , x9 
		srl     x8 , x8 , x17 
		addi    x18 , x0 , 7 
		bne     x8 , x18 , Fail 
Bigger_r:
		or      x9 , x1 , x3 
		xor     x8 , x1 , x3 
		add     x8 , x8 , x9 
		sra     x8 , x8 , x17 
		addi    x18 , x0 , 117 
		bne     x8 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
