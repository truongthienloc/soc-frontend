.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 127 
		addi    x7 , x0 , 133 
		addi    x31 , x0 , 182 
		bltu    x18 , x7 , Less_i 
		bgeu    x18 , x7 , Bigger_i 
Less_i:
		addi    x4 , x31 , 22 
		andi    x16 , x31 , 71 
		add     x16 , x16 , x4 
		srli    x16 , x16 , 0 
		addi    x10 , x0 , 210 
		bne     x16 , x10 , Fail 
Bigger_i:
		ori     x4 , x31 , 189 
		xori    x16 , x31 , 107 
		add     x16 , x16 , x4 
		srai    x16 , x16 , 3 
		addi    x10 , x0 , 51 
		bne     x16 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
