.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , -2048 
		addi    x5 , x0 , 41 
		sltu    x9 , x24 , x5 
		bltu    x24 , x5 , Less_i 
		bgeu    x24 , x5 , Bigger_i 
Less_i:
		ori     x22 , x24 , 159 
		sub     x10 , x5 , x24 
		srai    x10 , x10 , 0 
		and     x10 , x10 , x0 
		addi    x25 , x0 , 0 
		beq     x10 , x25 , Pass 
Bigger_i:
		ori     x22 , x24 , 77 
		sub     x10 , x5 , x24 
		srai    x10 , x10 , 0 
		and     x10 , x10 , x0 
		addi    x25 , x0 , 0 
		beq     x10 , x25 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
