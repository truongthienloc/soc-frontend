.text

#The program finds the value of fibonacci 

Fibo:
		addi    x23 , x0 , 0
		addi    x16 , x0 , 1
		addi    x30 , x0 , 1
		addi    x24 , x0 , 3
		beq     x23 , x0 , Result0 
		beq     x23 , x30 , Result1 
Loop: 
		blt     x23 , x24 , Result
		add     x14 , x16 , x30
		addi    x16 , x30 , 0
		addi    x30 , x14 , 0
		addi    x24 , x24 , 1
		jal     x0 , Loop 
Result0:
		addi    x14 , x0 , 0 
		addi    x17 , x0 , 0 
		bne     x14 , x17 , Fail 
Result1:
		addi    x14 , x0 , 1 
		addi    x27 , x0 , 1
		bne     x14 , x27 , Fail 
Result:
		addi    x18 , x0 , 0 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
