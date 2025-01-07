.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 180 
		addi    x28 , x0 , 86 
		addi    x13 , x0 , 0 
		bltu    x24 , x28 , Less_i 
		bgeu    x24 , x28 , Bigger_i 
Less_i:
		addi    x9 , x13 , 130 
		andi    x14 , x13 , 126 
		add     x14 , x14 , x9 
		srli    x14 , x14 , 0 
		addi    x31 , x0 , 130 
		bne     x14 , x31 , Fail 
Bigger_i:
		ori     x9 , x13 , 77 
		xori    x14 , x13 , 125 
		add     x14 , x14 , x9 
		srai    x14 , x14 , 3 
		addi    x31 , x0 , 25 
		bne     x14 , x31 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
