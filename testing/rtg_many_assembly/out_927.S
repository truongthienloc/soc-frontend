.text

#The program checks the ALU instruction in R_type

Main:
		addi    x30 , x0 , 14 
		addi    x31 , x0 , -85 
		addi    x14 , x0 , 98 
		addi    x7 , x0 , 83 
		addi    x12 , x0 , 3 
		blt     x30 , x31 , Less_r 
		bge     x30 , x31 , Bigger_r 
Less_r:
		sub     x17 , x14 , x7 
		and     x1 , x14 , x7 
		add     x1 , x1 , x17 
		srl     x1 , x1 , x12 
		addi    x23 , x0 , 10 
		bne     x1 , x23 , Fail 
Bigger_r:
		or      x17 , x14 , x7 
		xor     x1 , x14 , x7 
		add     x1 , x1 , x17 
		sra     x1 , x1 , x12 
		addi    x23 , x0 , 20 
		bne     x1 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
