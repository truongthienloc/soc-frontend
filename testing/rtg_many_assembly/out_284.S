.text

#The program checks the ALU instruction in R_type

Main:
		addi    x11 , x0 , 196 
		addi    x27 , x0 , 97 
		addi    x31 , x0 , 51 
		addi    x19 , x0 , 100 
		addi    x28 , x0 , 3 
		blt     x11 , x27 , Less_r 
		bge     x11 , x27 , Bigger_r 
Less_r:
		sub     x16 , x31 , x19 
		and     x24 , x31 , x19 
		add     x24 , x24 , x16 
		srl     x24 , x24 , x28 
		addi    x14 , x0 , -3 
		bne     x24 , x14 , Fail 
Bigger_r:
		or      x16 , x31 , x19 
		xor     x24 , x31 , x19 
		add     x24 , x24 , x16 
		sra     x24 , x24 , x28 
		addi    x14 , x0 , 25 
		bne     x24 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
