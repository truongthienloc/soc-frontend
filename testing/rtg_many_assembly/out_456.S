.text

#The program checks the ALU instruction in R_type

Main:
		addi    x11 , x0 , 152 
		addi    x14 , x0 , 53 
		addi    x22 , x0 , 10 
		addi    x26 , x0 , 85 
		addi    x6 , x0 , 3 
		blt     x11 , x14 , Less_r 
		bge     x11 , x14 , Bigger_r 
Less_r:
		sub     x28 , x22 , x26 
		and     x23 , x22 , x26 
		add     x23 , x23 , x28 
		srl     x23 , x23 , x6 
		addi    x12 , x0 , -10 
		bne     x23 , x12 , Fail 
Bigger_r:
		or      x28 , x22 , x26 
		xor     x23 , x22 , x26 
		add     x23 , x23 , x28 
		sra     x23 , x23 , x6 
		addi    x12 , x0 , 23 
		bne     x23 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
